import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
//gb66h-oqdvh-4lrah-pgiw3-sx2xh-zcipm-zl47v-okvml-k4c4e-mkatu-tae

actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
  let itemName = name;
  let nftOwner = owner;
  let imageBytes = content;

  public query func getName() : async Text{
    return itemName;
  };

  public query func getOwner() : async Principal {
    return nftOwner;
  };

  public query func getAsset() : async [Nat8] {
    return imageBytes;
  };
  
  public query func getCanisterId() : async Principal {
    return Principal.fromActor(this);
  };
};
