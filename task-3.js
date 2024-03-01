// Function that takes a binary packet as an ArrayBuffer and parses it into a JavaScript object.
function parseDataPacket(packetBuffer) {
  const headerSize = 1 + 1 + 4 + 2 + 1 // Size of Device, Packet Length, Checksum, Data Address, and R/W Command
  const dataView = new DataView(packetBuffer)

  const device = dataView.getUint8(0) // Read the first byte for the Device
  const packetLength = dataView.getUint8(1) // Read the second byte for the Packet Length
  const checksum = dataView.getUint32(2, true) // Read next four bytes for Checksum (assuming little-endian)
  const dataAddress = dataView.getUint16(6, true) // Read two bytes for Data Address (assuming little-endian)
  const command = dataView.getUint8(8) // Read next byte for R/W Command

  // Calculate the length of the data payload
  const dataLength = packetLength - headerSize
  const data = new Uint8Array(packetBuffer.slice(headerSize, headerSize + dataLength))

  // Convert the command byte to a meaningful string
  const commandString = command === 0 ? 'Write' : 'Read'

  return {
    device,
    packetLength,
    checksum,
    dataAddress,
    command: commandString,
    data, // This will be an array of bytes representing the data
  }
}

// Mock binary packet as an ArrayBuffer
// Packet structure is as follows:
// Device (1 byte) | Packet Length (1 byte) | Checksum (4 bytes) | Data Address (2 bytes) | R/W Command (1 byte) | Data (variable length)

// For example: Device Type 1, Packet Length 11, Checksum 1234567890, Data Address 300, R/W Command 1 (Read), Data 'ABCD'
const packetBytes = new Uint8Array([
  1, // Device
  11, // Packet Length (total length of the packet including the header)
  0x49,
  0x96,
  0x02,
  0xd2, // Checksum (1234567890 in hexadecimal)
  0x01,
  0x2c, // Data Address (300 in hexadecimal)
  1, // R/W Command (1 for Read)
  65,
  66,
  67,
  68, // Data ('ABCD' as ASCII values)
])

// Convert the Uint8Array to ArrayBuffer
const packetBuffer = packetBytes.buffer

// Parse the binary packet
const parsedPacket = parseDataPacket(packetBuffer)

// Display the parsed packet data
console.log('Parsed Packet:', parsedPacket)
