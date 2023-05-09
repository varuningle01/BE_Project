// import React from 'react';
// import {Text} from 'react-native';

// function AssistantScreen() {
//   return <Text>AssistantScreen</Text>;
// }

// export default AssistantScreen;
import React, {useState} from 'react';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import axios from 'axios';

export const AssistantScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: question,
          max_tokens: 1000,
          model: 'text-davinci-003',
          temperature: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        },
      );

      setAnswer(response.data.choices[0].text);
    } catch (error) {
      setAnswer('Error generating answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ask me anything"
        style={{margin: 10, padding: 10, borderWidth: 1, color: 'black'}}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {loading ? (
        <ActivityIndicator style={{margin: 10}} />
      ) : (
        <Text style={{margin: 10, color: 'black'}}>{answer}</Text>
      )}
    </View>
  );
};
