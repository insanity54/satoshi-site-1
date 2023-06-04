



function nftComponent() {
  return {
    address: null,
    screen: 'login', // one of 'login', 'main', 'chat' 
    clsSound: new Howl({ preload: true, src: ['/assets/door_close_03.ogg', '/assets/door_close_03.mp3'] }),
    maxSound: new Howl({ preload: true, src: ['/assets/spring_02.ogg', '/assets/spring_02.mp3'] }),
    minSound: new Howl({ preload: true, src: ['/assets/weird_03.ogg', '/assets/weird_03.mp3'] }),
    isOfflineGroupDisplayed: Alpine.$persist(true),
    isOnlineGroupDisplayed: Alpine.$persist(true),
    init() {
    },
    sfx (sound) {
      if (sound === 'min') this.minSound.play();
      else if (sound === 'max') this.maxSound.play();
      else if (sound === 'cls') this.clsSound.play();
    },
    addressTrunc () {
      if (!this.address) return '';
      if (this.address.length <= 10) {
        return this.address; // No need to truncate if the address is already short
      }
      
      const firstFourChars = this.address.slice(0, 5);
      const lastFourChars = this.address.slice(-5);
      
      return `${firstFourChars}...${lastFourChars}`;
    },
    async price() {
      const res = await fetch('https://api.val.town/v1/run/insanity54.mil')
      const data = await res.json()
      if (!res.ok) {
        return 'MILADY MILADY MILADY'
      } else {
        return `$MIL Floor Price ${data[1].toFixed(2)} ETH`
      }
    },
    signout() {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.selectedAddress = null; // Clear the selected address
        // Reset any other state variables or UI elements as needed
        this.address = null;
        this.screen = 'login';
        // Clear the avatar or any other UI representation of the address
      }
    },
    signin() {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to sign in.');
        return;
      }

      // Request access to the user's MetaMask accounts
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          // Handle the signed-in user
          const selectedAddress = accounts[0];
          this.address = selectedAddress
          this.screen = 'main'
          jdenticon.update("#avatar", this.address);
        })
        .catch((error) => {
          console.error('Sign in error:', error);
        });
      

    }
  }
}
