"use server"

enum TOOLS {
  FETCH_ROOMS = "fetchRooms",
}

export const getBotTools = async () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "fetchRooms",
        description:
          "fetch details of all the available rooms in the resort. use this when user want to book room in the resort.",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    },
    {
      type: "function",
      function: {
        name: "bookRoom",
        description:
          "book a room for the user with the given details, fullName, roomId, email and nights",
        parameters: {
          type: "object",
          properties: {
            roomId: {
              type: "number",
              description: "the id of the room to book",
            },
            fullName: {
              type: "string",
              description: "the full name of the user",
            },
            email: {
              type: "string",
              description: "the email of the user",
            },
            nights: {
              type: "number",
              description:
                "number of nights the user wants to book the room for",
            },
          },
          required: ["roomId", "fullName", "email", "nights"],
        },
      },
    },
  ]

  return tools
}

export const createBotTools = async () => {}

const fetchRooms = async () => {}

const getEmailDetails = async () => {}

/**
 * const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: TOOLS.FETCH_ROOMS,
      description: 'fetch details of all the available rooms, the prices and the description',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: TOOLS.BOOK_ROOM,
      description: 'book a room for the user with the given details, fullName, roomId, email and nights',
      parameters: {
        type: 'object',
        properties: {
          roomId: {
            type: 'number',
            description: 'the id of the room to book',
          },
          fullName: {
            type: 'string',
            description: 'the full name of the user',
          },
          email: {
            type: 'string',
            description: 'the email of the user',
          },
          nights: {
            type: 'number',
            description: 'number of nights the user wants to book the room for',
          },
        },
        required: ['roomId', 'fullName', 'email', 'nights'],
      },
    },
  },
];
 */
