use wasm_bindgen::prelude::*;

// Convert back and forth between Celsius and Fahrenheit
#[wasm_bindgen]
pub fn convert_temperature(degrees: i32, unit: &str) -> String {
  let temp: f32 = degrees as f32;
  if unit == "C" {
    ((temp - 32.0) / 1.8).to_string()
  } else { // unit == "F"
    ((temp * 1.8) + 32.0).to_string()
  }
}
