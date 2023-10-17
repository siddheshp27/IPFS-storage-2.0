import { Web3Storage, getFilesFromPath } from "web3.storage";
import { Blob } from "web3.storage";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDExZEJiNjEwNDczMURlRjBDMzExNGJmMDgxNTY1OUJCNGVlYWJEZjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTM1MzY0MTg2ODksIm5hbWUiOiJ0ayJ9.sgDYwWqF4cg2RTSnhu7JtA_8U9NFPwMwWz4cLDpKorg";
const showFile = async function (e) {
  e.preventDefault();
  const fileObj = document.getElementById("inp");
  const displayImage = document.getElementById("displayImage");

  let file = await fileObj.files[0];
  console.log(e.target.result);
  console.log(file);

  // const files = [new Blob([file], { type: file.type })];
  console.log(fileObj.files);
  const client = new Web3Storage({ token });
  // const files = await getFilesFromPath('/path/to/file')
  const cid = await client.put(fileObj.files);
  console.log(cid);
  var divElement = document.getElementById("myDiv");
  divElement.textContent = cid;

  // const ipfs = await window.IpfsCore.create();

  // loader.style.visibility = "visible";
  // const { path } = await ipfs.add(file);
  // loader.style.visibility = "hidden";
  // console.log("hash", path);
  // sessionStorage.setItem("hash", path);
};

const render = async function () {
  // loader.style.visibility = "visible";

  // console.log(hash);
  const client = new Web3Storage({ token });

  const cid = document.getElementById("hash").value;
  console.log(cid);

  const res = await client.get(cid);
  const files = await res.files();
  console.log(files);
  //converting tif to jpg

  const selectedFile = files[0]; // Use the file variable
  console.log(selectedFile);
  if (selectedFile) {
    // Create a FileReader object
    const reader = new FileReader();

    // Define an event handler for when the file is loaded
    reader.onload = (e) => {
      // Set the src attribute of the img element to the data URL of the loaded image
      displayImage.src = e.target.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(selectedFile);
  }

  //adding image to frontend
  // const img = document.createElement("img");
  // container.appendChild(img);
  // console.log(result);
  // const {
  //   dto: { Files },
  // } = result;
  // const [obj] = Files;
  // const { Url } = obj;
  // console.log(Url);
  // img.src = link;
  // loader.style.visibility = "hidden";
};

//enroll hyperledger users
function createUserHyperledger(username) {
  loader.style.visibility = "visible";

  axios
    .post("http://localhost:4000/users", {
      username: username,
      orgName: "Org1",
    })
    .then(function (response) {
      console.log(response);
      const {
        data: { token },
      } = response;
      sessionStorage.setItem("token", token);
      const tkn = sessionStorage.getItem("token");
      loader.style.visibility = "hidden";

      alert(`Your Token is \n${tkn}`);
      console.log(tkn);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/// retreiving from hyperledger

const retreiveFromHyperledger = async function (e) {
  e.preventDefault();
  container.innerHTML = "";
  const token = sessionStorage.getItem("token");
  const count = localStorage.getItem("count");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  for (let i = 1; i < count; i++) {
    axios
      .get(
        `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${i}"]&fcn=GetCarById`,
        config
      )
      .then(function (response) {
        console.log(response);
        const {
          data: {
            result: { make },
          },
        } = response;
        console.log(make);
        render(make);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//uploading to hyperledger
// const uploadToHyperledger = async function () {
//   const token = sessionStorage.getItem("token");
//   const id = localStorage.getItem("count");
//   const hash = sessionStorage.getItem("hash");
//   console.log(id);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   axios
//     .post(
//       "http://localhost:4000/channels/mychannel/chaincodes/fabcar",
//       {
//         fcn: "CreateCar",
//         chaincodeName: "fabcar",
//         channelName: "mychannel",
//         args: [
//           `{"id":"${id}","make":"${hash}","addedAt":0,"model":"Null", "color":"Null","owner":"${token}"}`,
//         ],
//       },
//       config
//     )
//     .then(function (response) {
//       // handle success
//       console.log(response);
//       // const {
//       //   data: {
//       //     result: {
//       //       result: { txid },
//       //     },
//       //   },
//       // } = response;
//       // sessionStorage.setItem("transcationId", txid);
//       localStorage.setItem("count", Number(id) + 1);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// };

const query = function () {
  const hash = sessionStorage.getItem("hash");
  // uploadToHyperledger();
};

// const register = function () {
//   let username = prompt("Enter Your User Name : ");
//   console.log(username);
//   if (username != null && username != "") createUserHyperledger(username);
//   else register();
// };

// const settingUpToken = async function () {
//   let token = prompt("Enter Your Token (Enter -1 if you don't have one)");
//   console.log(token);
//   if (token != null && token != "") {
//     if (token == -1) {
//       register();
//     } else sessionStorage.setItem("token", token);
//   } else settingUpToken();
// };

const inp = document.getElementById("inp");
inp.addEventListener("change", showFile);

const submit = document.getElementById("submit");
submit.addEventListener("click", query);

const display = document.getElementById("display");
display.addEventListener("click", render);

const loader = document.getElementById("loader");
const container = document.querySelector(".img-container");

settingUpToken();
// retreiveFromHyperledger();
