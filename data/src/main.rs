extern crate hyper;
extern crate rustc_serialize;

mod repos;
mod util;

use repos::RepoMod;

fn main() {
  // get repo data
  let mut rp = RepoMod::new();

  rp.addu_gh_repos();

  rp.addf_gh_repos();

  rp.addu_bb_repos();

  rp.print();

  // output to json files
  util::write_file("data_min.json", &rp.to_min_string());
  util::write_file("data.json", &rp.to_string());

  // println!("{}", rp.to_string());

  // println!("{}", rp.to_min_string());

  // // show number of repos in array
  println!("\n\n[rs] {:?} items total\n", rp.len());
}

