extern crate hyper;
extern crate rustc_serialize;

mod repos;
mod util;

use repos::RepoMod;

fn main() {
  let mut rp = RepoMod::new();

  println!("[ir] Retrieving repo data now");

  //get data & filter/clean it, then write to file
  rp.addu_gh_repos();
  rp.addf_gh_repos();
  rp.addu_bb_repos();
  util::write_file("data.json", &rp.to_min_string());
  
  println!("[ir] {:?} items retrieved total", rp.len());
}

