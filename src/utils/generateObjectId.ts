export default function generateObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16).padStart(8, '0'); // 8 characters
    const randomHex = () => Math.random().toString(16).substr(2, 16).padStart(16, '0'); // 16 characters
    return timestamp + randomHex().substr(0, 16);
  }
