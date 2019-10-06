export default `
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  h1 {
    margin-top: 28px;
    margin-bottom: 14px;
    font-size: 28px;
  }

  h2 {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 24px;
  }

  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 20px;
  }

  h4 {
    margin-top: 18px;
    margin-bottom: 9px;
    font-size: 18px;
  }

  h5, h6 {
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 16px;
  }

  p, ul, ol, blockquote, pre, table {
    margin: 8px 0;
  }

  p {
    text-align: justify;
  }

  ul, ol {
    padding-left: 2em;
  }

  li {
    margin: 5px 0;
  }

  blockquote {
    border-left-width: 5px;
    border-left-style: solid;
    border-left-color: rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.05);
    color: #6a737d;
    padding: 2px 10px;
  }

  pre {
    padding: 10px;
    background-color: #000;
    color: #eaeaea;
  }

  pre code {
    display: -webkit-box !important;
    overflow: auto;
    overflow-scrolling: touch;
  }

  p code, li code {
    font-size: 14px;
    padding: 2px 4px;
    border-radius: 3px;
    background-color: rgba(27, 31, 35, .05);
    color: #1e6bb8;
  }

  img {
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    max-width: 100% !important;
    height: auto !important;
  }

  a {
    text-decoration: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #1e6bb8;
    color: #1e6bb8;
  }

  table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }

  tr:nth-child(2n) {
    background-color: #fbfbfb;
  }

  th, td {
    padding: 8px 10px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #eee;
  }

  th {
    border-top: 1px solid #ddd;
    text-align: center;
    font-weight: bold;
    background-color: #f6f6f6;
  }
`;
