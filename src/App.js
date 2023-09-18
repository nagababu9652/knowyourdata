import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    // Check if the selected file's format is allowed
    const allowedFormats = ['txt', 'csv', 'json']; // Define your allowed formats here
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (!allowedFormats.includes(fileExtension)) {
      alert('Invalid file format. Allowed formats: txt, csv, json');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        alert(response.data.message);
        // You can handle the response here
        setDownloadLink(`http://localhost:5000/download/${response.data.filename}`);
      })
      .catch((error) => {
        console.error(error);
        alert('File upload failed.', error);
      });
  };

  return (


    <div className="App">

      <header>
        {/* Banner with Logo, Site Name, Sign In, and Sign Up */}
        <div className="banner">
          <div className="logo">Logo</div>
          <div className="site-name">Site Name</div>
          <div className="sign-in-sign-up">
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        </div>

        {/* Navigation Tabs */}

        <div className='navigation'>
          <nav>
            <ul>
              <li>Tab 1</li>
              <li>Tab 2</li>
              <li>Tab 3</li>
              <li>Tab 4</li>
              <li>Tab 5</li>
              <li>Tab 6</li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search for utilities" />
            <button>Search</button>
          </div>
        </div>
      </header>

      <main>
        <section className="context">
          {/* Context Links */}
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>

        <section className="body">
          <section>
            <h1>Upload a File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
          </section>

          {downloadLink && (
            <section>
              <div>
                <a href={downloadLink} download="processed_file.txt">
                  Download Processed File
                </a>
              </div>
            </section>
          )}
        </section>

        <section className="ads">
          {/* Ads or Additional Content */}
          <div className="ad">Ad 1</div>
          <div className="ad">Ad 2</div>
        </section>
      </main>

      <footer>
        {/* Footer Content */}
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: example@example.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          {/* Add social media icons/links here */}
          <a href="#" className="social-icon">Facebook</a>
          <a href="#" className="social-icon">Twitter</a>
          <a href="#" className="social-icon">LinkedIn</a>
        </div>

        <div className="copyright">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
}

export default App;
