import { Actor, HttpAgent } from "@dfinity/agent";
import { hello } from "../../declarations/hello";
import { idlFactory } from "../../declarations/nft";
import { Principal } from "@dfinity/candid/lib/cjs/idl";

const localHost = "http://127.0.0.1:8000/";
const agent = new HttpAgent({host: localHost});
const img = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84, 8, 215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49, 241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
const img2 = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 10, 0, 0, 0, 10, 8, 6, 0, 0, 0, 141, 50, 207, 189, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 68, 101, 88, 73, 102, 77, 77, 0, 42, 0, 0, 0, 8, 0, 1, 135, 105, 0, 4, 0, 0, 0, 1, 0, 0, 0, 26, 0, 0, 0, 0, 0, 3, 160, 1, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 160, 2, 0, 4, 0, 0, 0, 1, 0, 0, 0, 10, 160, 3, 0, 4, 0, 0, 0, 1, 0, 0, 0, 10, 0, 0, 0, 0, 59, 120, 184, 245, 0, 0, 0, 113, 73, 68, 65, 84, 24, 25, 133, 143, 203, 13, 128, 48, 12, 67, 147, 94, 97, 30, 24, 0, 198, 134, 1, 96, 30, 56, 151, 56, 212, 85, 68, 17, 88, 106, 243, 241, 235, 39, 42, 183, 114, 137, 12, 106, 73, 236, 105, 98, 227, 152, 6, 193, 42, 114, 40, 214, 126, 50, 52, 8, 74, 183, 108, 158, 159, 243, 40, 253, 186, 75, 122, 131, 64, 0, 160, 192, 168, 109, 241, 47, 244, 154, 152, 112, 237, 159, 252, 105, 64, 95, 48, 61, 12, 3, 61, 167, 244, 38, 33, 43, 148, 96, 3, 71, 8, 102, 4, 43, 140, 164, 168, 250, 23, 219, 242, 38, 84, 91, 18, 112, 63, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130])

async function loadNFT(imgNFT, nameUsercreateNFT, number){
  const nftID = await hello.mint(imgNFT, nameUsercreateNFT);
  const NFTActor = await Actor.createActor(idlFactory, {
    agent,
    canisterId: nftID,
  });
  const name = await NFTActor.getName();
  const owner = await NFTActor.getOwner();
  const imageData = await NFTActor.getAsset();
  const imageContent = new Uint8Array(imageData);
  const image = URL.createObjectURL(
    new Blob([imageContent.buffer], { type: "image/png" })
  );

  document.querySelector(".id" + number).innerHTML = "ID: " + nftID;
  document.querySelector(".address" + number).innerHTML = "Owner: " + owner.toText();
  document.getElementById("nft" + number).src = image;
  document.querySelector(".nameNFT" + number).innerHTML = "Name: " + name;
}

loadNFT(img, "NFT1", "1");
loadNFT(img2, "NFT2", "2");
