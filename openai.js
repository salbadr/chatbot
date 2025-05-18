class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        const apiKey = process.env.OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-1106",
                    messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                    max_tokens: 150
                }),
            });
            const responseData = await response.json();
            if(responseData.error){
                throw new Error(responseData.error.message)
            }
            // Log the entire API response for debugging
            console.log('Response from OpenAI API:', responseData.choices[0].message);
            // Check if choices array is defined and not empty
            if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
                return responseData.choices[0].message.content;
            } 
        }
        catch (error) {
            console.error(error)
        }
    }
}
module.exports = { OpenAIAPI };