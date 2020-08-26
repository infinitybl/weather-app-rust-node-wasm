use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_json::{Result, Value};

#[derive(Serialize, Deserialize, Debug)]
pub struct Coordinates {
    pub lat: f32,
    pub lon: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Main {
    pub temp: f32,
    pub tempF: Option<f32>,
    pub temp_min: f32,
    pub temp_minF: Option<f32>,
    pub temp_max: f32,
    pub temp_maxF: Option<f32>,
    pub pressure: f32,
    pub sea_level: Option<f32>,
    pub grnd_level: Option<f32>,
    pub humidity: f32,
    pub temp_kf: Option<f32>
}

// #[derive(Serialize, Deserialize, Debug)]
// pub struct MainWithF {
//     pub temp: f32,
//     pub tempF: f32,
//     pub temp_min: f32,
//     pub temp_minF: f32,
//     pub temp_max: f32,
//     pub temp_maxF: f32,
//     pub pressure: f32,
//     pub sea_level: Option<f32>,
//     pub grnd_level: Option<f32>,
//     pub humidity: f32,
//     pub temp_kf: Option<f32>
// }

#[derive(Serialize, Deserialize, Debug)]
pub struct Weather {
    pub id: u32,
    pub main: String,
    pub description: String,
    pub icon: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Clouds {
    pub all: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Wind {
    pub speed: f32,
    pub deg: f32,
    pub gust: Option<f32>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct System {
    pub pod: Option<String>
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Sys {
#[serde(rename="type")]
    pub message_type: u32,
    pub id: u32,
    pub message: Option<f32>,
    pub country: String,
    pub sunrise: u64,
    pub sunset: u64, 
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WeatherReportCurrent {
    pub coord: Coordinates,
    pub weather: Vec<Weather>,
    pub base: String,
    pub main: Main,
    pub visibility: u32,
    pub wind: Wind,
    pub clouds: Clouds,
    pub dt: u64,
    pub sys: Sys,
    pub id: u64,
    pub name: String,
    pub cod: u16,
}

// #[derive(Serialize, Deserialize, Debug)]
// pub struct WeatherReportCurrentWithF {
//     pub coord: Coordinates,
//     pub weather: Vec<Weather>,
//     pub base: String,
//     pub main: MainWithF,
//     pub visibility: u32,
//     pub wind: Wind,
//     pub clouds: Clouds,
//     pub dt: u64,
//     pub sys: Sys,
//     pub id: u64,
//     pub name: String,
//     pub cod: u16,
// }

// Convert back and forth between Celsius and Fahrenheit
pub fn convert_temperature(degrees: f32, unit: &str) -> f32 {
  if unit == "C" {
    return (degrees - 32.0) / 1.8;
  } else { // unit == "F"
    return (degrees * 1.8) + 32.0;
  }
}

// Parses the JSON response from the weather API, calling convert_temperature to 
// add the temperatures in Fahrenheit
#[wasm_bindgen]
pub fn parse_json(jsonString: &str) -> String {
  // Parse the string of data into WeatherReportCurrent
  let mut json: WeatherReportCurrent = serde_json::from_str(jsonString).unwrap();

  // Set Fahrenheit temps
  json.main.tempF = Some(convert_temperature(json.main.temp, "F"));

  json.main.temp_minF = Some(convert_temperature(json.main.temp_min, "F"));

  json.main.temp_maxF = Some(convert_temperature(json.main.temp_max, "F"));

  // Convert WeatherReportCurrent json back into string
  return serde_json::to_string(&json).unwrap();
}
