
import OpenAI from "openai";

// To handle a POST request to /api
export async function POST(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // get request body
    const body = await request.json();
    console.log(body);

    // append body.initialPrompt with body.messages
    const allMessages = [body.initialPrompt].concat(body.messages);
    console.log(allMessages);

    const completion = await openai.chat.completions.create({
        messages: allMessages,
        model: body.model
    });

    console.log(completion.choices[0]);
    return Response.json(completion.choices[0].message)
}
