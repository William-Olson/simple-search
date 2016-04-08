use std::io::prelude::*;
use std::fs::File;


/// Tries to create or overwrite a file with the given
/// filename.  Outputs the data string to the file if
/// creation of the file was successfull.
///
/// # Panics
///
/// Will panic if creation of file fails (implicit).
/// Will only output error message if write fails.
pub fn write_file(filename: &str, data: &str) {
  let mut file_buff = File::create(filename).unwrap();

  match write!(file_buff, "{}", data) {
    Ok(_) => {},
    Err(e) => { println!("Data could not be written to file! \n{:?}", e); },
  };
}

