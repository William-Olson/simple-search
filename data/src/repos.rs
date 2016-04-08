
use std::io::Read;
use hyper::Client;
use hyper::header::UserAgent;
use rustc_serialize::json::{self, Json, Encoder, ToJson};
use rustc_serialize::Encodable;


// -------- Constants --------


// github
const GH_USR: &'static str = "William-Olson";
const GH_USR_REPOS: &'static str = 
      "https://api.github.com/users/William-Olson/repos";
const GH_FRIENDS: &'static str = 
      "https://api.github.com/users/William-Olson/following";

// bitbucket
const BB_USR: &'static str = "willko";
const BB_USR_REPOS: &'static str = 
      "https://api.bitbucket.org/2.0/repositories/willko";


// -------- Structs --------

#[derive(RustcDecodable, RustcEncodable)]
struct User {
  handle: String,
  avatar_url: String,
  html_url: String,
}

#[derive(RustcDecodable, RustcEncodable)]
struct Repo {
  name: String,
  url: String,
  description: String,
  owner: User,
  private: bool,
  host: String,
  lang: String,
}

/// Holds an array of json encodable Repo structs.
pub struct RepoMod {
  arr: Vec<Repo>,
}


// -------- Implementations --------

impl RepoMod {

  /// Creates a new RepoMod struct.
  pub fn new() -> RepoMod {
    RepoMod {
      arr: Vec::new(),
    }
  }

  #[allow(dead_code)]
  /// Adds user's github repos to self.arr.
  pub fn addu_gh_repos(&mut self) {
    // Create an outgoing request.
    let client = Client::new();
    let mut response = client.get(GH_USR_REPOS)
        .header(UserAgent(GH_USR.to_owned()))
        .send().unwrap();
    // Read the Response.
    let mut resp_blob = String::new();
    response.read_to_string(&mut resp_blob).unwrap();
    // Extract each json repo object with filtered fields
    // and add it to the arr array.
    gh_filter(&mut self.arr, &resp_blob);
  }

  #[allow(dead_code)]
  /// Adds the github repos of users that
  /// GH_USR follows to self.arr.
  pub fn addf_gh_repos(&mut self) {
    // Create an outgoing request.
    let client = Client::new();
    let mut response = client.get(GH_FRIENDS)
        .header(UserAgent(GH_USR.to_owned()))
        .send().unwrap();
    let mut resp_blob = String::new();
    response.read_to_string(&mut resp_blob).unwrap();
    add_friends_repos(&mut self.arr, &resp_blob);
  }

  #[allow(dead_code)]
  /// Adds user's bitbucket repos to self.arr.
  pub fn addu_bb_repos(&mut self) {
    // Create an outgoing request.
    let client = Client::new();
    let mut response = client.get(BB_USR_REPOS)
        .header(UserAgent(BB_USR.to_owned()))
        .send().unwrap();
    // Read the Response.
    let mut resp_blob = String::new();
    response.read_to_string(&mut resp_blob).unwrap();
  	bb_filter(&mut self.arr, &resp_blob);
  }

  #[allow(dead_code)]
  /// Creates a pretty print string of self.arr.
  pub fn to_string(&self) -> String {
    // Make a pretty json string from arr data.
    let mut encoded = String::new();
    {
      let mut encoder = Encoder::new_pretty(&mut encoded);
      self.arr.encode(&mut encoder).expect("JSON encode error");
    }
    encoded
  }

  #[allow(dead_code)]
  /// Creates a minified json string from self.arr.
  pub fn to_min_string(&self) -> String {
    json::encode(&self.arr).unwrap()
  }

  #[allow(dead_code)]
  /// Returns the length of self.arr.
  pub fn len(&self) -> usize { self.arr.len() }

  #[allow(dead_code)]
  /// Prints the self.arr to the console.
  pub fn print(&self) { prpr_json(&self.to_json()); }
}


// -------- Traits --------

impl ToJson for Repo {
  fn to_json(&self) -> Json {
    let enc = json::encode(&self).unwrap();
    Json::from_str(&enc).unwrap()
  }
}

impl ToJson for RepoMod {
  fn to_json(&self) -> Json {
    let enc = json::encode(&self.arr).unwrap();
    Json::from_str(&enc).unwrap()
  }
}


// -------- Private Methds --------

fn gh_filter(buff: &mut Vec<Repo>, blob: &String) {
  // Parse response data to array.
  if let Ok(data) = Json::from_str(&blob) {
    // Return if bad respose is given.
    if data.is_array() == false { println!("Error: not arr: {}", blob); return; }
    let arr =  data.as_array().unwrap();
    
    for d in arr.iter() {
      //user data
      let uname = d.find("owner").unwrap().find("login").unwrap().as_string().unwrap();
      let uava  = d.find("owner").unwrap().find("avatar_url").unwrap().as_string().unwrap();
      let uhome = d.find("owner").unwrap().find("html_url").unwrap().as_string().unwrap();

      //repo data
      let rname = d.find("name").unwrap().as_string().unwrap();
      let rhome = d.find("html_url").unwrap().as_string().unwrap();
      let rvis  = d.find("private").unwrap().as_boolean().unwrap();

      //handle description field null values
      let rdes: String;
      if let Some(val)  = d.find("description") {
      	if val.is_null() == true {
          rdes = String::from("");
      	} else {
      	  rdes = val.as_string().unwrap().to_string();
      	}
      }else {
      	rdes = String::from("");
      }

      //handle language field null values
      let lng: String;
      if let Some(val) = d.find("language"){
      	if val.is_null() == true {
          lng = String::from("");
      	} else {
      	  lng = val.as_string().unwrap().to_string();
      	}
      } else {
      	lng = String::from("");
      }
      
      // Make a repo struct with filtered data.
      buff.push( Repo {
        name: rname.to_string(),
        url: rhome.to_string(),
        description: rdes,
        owner: User {
          handle: uname.to_string(),
          avatar_url: uava.to_string(),
          html_url: uhome.to_string(),
        },
        private: rvis,
        host: "github".to_owned(),
        lang: lng,
      });
    }
  } else {
  	// println!("gh_filter Err, Not JSON:\n\t {}", blob);
  }

}


fn add_friends_repos(buff: &mut Vec<Repo>, blob: &String) {
  // Parse response blob to json.
  if let Ok(data) = Json::from_str(&blob) {
  	
    // Stop and return if bad respose is given.
    if data.is_array() == false {
      println!("Bad Response: {:?}", blob);
      return;
    }

    // Convert json to vec array & create http client.
    let friends =  data.as_array().unwrap();
    let client = Client::new();

    for usr in friends.iter() {
      // Grab url for usr's list of repos.
      if let Some(friend_repos_url) = usr.find("repos_url"){

        // Send http GET for friend repo list
      	let rp_url = friend_repos_url.as_string().unwrap();
        let mut response = client.get(rp_url)
          .header(UserAgent(GH_USR.to_owned()))
          .send().unwrap();

        // Add friend's repos to buff if respose is good.
        let mut resp_blob = String::new();
        if let Ok(_) = response.read_to_string(&mut resp_blob) {
          gh_filter(buff, &resp_blob);
        }
      }
    } // for
  }
}



fn bb_filter(buff: &mut Vec<Repo>, blob: &String) {
  // Parse response data to array.
  let data = Json::from_str(&blob).unwrap();
  let json_arr = data.find("values").unwrap().as_array().unwrap();

  for r in json_arr {

  	// repo fields
    let rname = r.find("name").unwrap().as_string().unwrap();
    let rdes  = r.find("description").unwrap().as_string().unwrap();
    let rurl  = r.find("links").unwrap()
                  .find("html").unwrap()
                  .find("href").unwrap().as_string().unwrap();
    let rvis  = r.find("is_private").unwrap().as_boolean().unwrap();
    let lng   = r.find("language").unwrap().as_string().unwrap();
     
    // user fields
    let uname = r.find("owner").unwrap()
    			 .find("username").unwrap().as_string().unwrap();
    let uhome = r.find("owner").unwrap()
                  .find("links").unwrap()
                  .find("html").unwrap()
                  .find("href").unwrap().as_string().unwrap();
    let uava  = r.find("owner").unwrap()
                  .find("links").unwrap()
                  .find("avatar").unwrap()
                  .find("href").unwrap().as_string().unwrap();

    // Add repo entry to the buff array.
    buff.push( Repo {
      name: rname.to_string(),
      url: rurl.to_string(),
      description: rdes.to_string(),
      owner: User {
        handle: uname.to_string(),
        avatar_url: uava.to_string(),
        html_url: uhome.to_string(),
      },
      private: rvis,
      host: "bitbucket".to_owned(),
      lang: lng.to_string(),
    });
  }
}

/// Prints the json struct to the console in pretty print.
fn prpr_json(json_obj: &Json) {
  // Make a pretty json string from arr data.
  let mut encoded = String::new();
  {
    let mut encoder = Encoder::new_pretty(&mut encoded);
    json_obj.encode(&mut encoder).expect("JSON encode error");
  }
  println!("{}", encoded);
}