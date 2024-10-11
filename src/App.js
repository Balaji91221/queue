import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  // Array of colors for queue items
  const colors = ["#fe5a31", "#fec031", "#20ab6f", "#31a2fe", "#fe3180", "#FF6712"];

  // Enqueues a new item onto the queue
  const enqueue = () => {
    if (inputValue.trim() !== '') {
      const newQueue = [...queue, inputValue]; // Add item to the end
      setQueue(newQueue); // Update state
      setInputValue(''); // Clear input
      setMessage(`Enqueued "${inputValue}" into the queue.`); // Set message
    } else {
      setMessage('Please enter a value to enqueue into the queue.');
    }
  };

  // Dequeues the front item off the queue
  const dequeue = () => {
    if (queue.length > 0) {
      const newQueue = queue.slice(1); // Remove the first item
      const dequeuedItem = queue[0];
      setQueue(newQueue); // Update state
      setMessage(`Dequeued "${dequeuedItem}" from the queue.`); // Set message
    } else {
      setMessage('Cannot dequeue from an empty queue.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Queue Visualizer (FIFO)</h2>
        </div>
        <div className="card-content">
          <div className="input-group">
            <input
              className="input"
              placeholder="Enter a value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            />
            <button className="button" onClick={enqueue}>Enqueue</button>
            <button className="button outline" onClick={dequeue}>Dequeue</button>
          </div>
          <p className="message">{message}</p>
          <div className="queue-container">
            <h3 className="queue-title">Queue Contents:</h3>
            <div className="queue">
              {queue.map((item, index) => (
                <div
                  key={index}
                  className={`queue-item ${index === 0 ? 'front-item' : ''}`}
                  style={{
                    backgroundColor: colors[index % colors.length],
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item}
                </div>
              ))}
              {queue.length === 0 && <p className="empty-queue">Queue is empty</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
