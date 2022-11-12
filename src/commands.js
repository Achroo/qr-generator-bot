const COMMANDS = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'qr',
        description: 'Generates a QR code',
        options: [
            {
                name: 'text',
                description: 'Text to encode',
                type: 3,
                required: true,
            },
        ],
    },
];

module.exports = COMMANDS;