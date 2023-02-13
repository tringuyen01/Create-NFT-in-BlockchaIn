import Debug "mo:base/Debug";
import NFTActorClass "../NFT/nft";
import Principal "mo:base/Principal";

actor createNFT {
  public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
      let owner : Principal = msg.caller;

      let newNFT = await NFTActorClass.NFT(name, owner, imgData);

      let newNFTPrincipal = await newNFT.getCanisterId();

      return newNFTPrincipal
    };
};