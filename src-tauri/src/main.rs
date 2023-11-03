#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use reqwest::blocking::Client;
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Deserialize, Clone, Serialize)]
struct PlaceHolderItem {
    userId: u32,
    id: u32,
    title: String,
}

#[tauri::command]
fn fetch_data() -> Vec<PlaceHolderItem> {
    println!("fetching data");
    let client = Client::new();
    let url = "https://jsonplaceholder.typicode.com/albums";

    // hint_loading_webservice
    let response = client.get(url).send();

    match response {
        Ok(mut response) => {
            if response.status().is_success() {
                let data: Vec<PlaceHolderItem> = response.json().unwrap();
                return data;
            } else {
                // return empty array
                let data: Vec<PlaceHolderItem> = [].to_vec();
                return data;
            }
        }
        Err(e) => {
            // convert e to string
            let data: Vec<PlaceHolderItem> = [].to_vec();
            return data;
        }
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            fetch_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
