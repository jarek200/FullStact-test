# To run the tasks 1,2 go to the task folders and follow the instructions in the README.md file.

# Task 3

Develop a code snippet that can parse a data packet
of X bytes long, with the packet structure divided into
two parts: a fixed-length header and a variable-length
payload. The header includes Device (uint8_t) with
options Agito, Master, and Hub; Packet Length
(uint8_t); Checksum (CRC) (uint32_t); Data Address
(uint16_t); and R/W Command with options Read and
Write (uint8_t). The payload contains Data with
nBytes. How would you distinguish the elements
within this data packet? Packet structure included.

To run the task run the following command:

### node task3.js
