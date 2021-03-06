export default `
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-top: 1.2em;
    margin-bottom: 1em;
    line-height: 1.35;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }

  p, ul, ol, dl, blockquote, pre, form, hr, table {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  p {
    text-align: justify;
  }

  ul, ol {
    padding-left: 2em;
  }

  li ul, li ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  blockquote {
    border-left-width: 5px;
    border-left-style: solid;
    border-left-color: #1abc9c;
    background-color: #fbfbfb;
    color: #666;
    padding: 1px 20px;
    margin-left: 0;
    margin-right: 0;
  }

  pre {
    padding: 10px 16px;
    background-color: #000;
    color: #eaeaea;
  }

  pre code {
    display: block;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  p code, li code {
    font-size: 14px;
    padding: 2px 4px;
    border-radius: 3px;
    background-color: #fbfbfb;
    color: #1abc9c;
  }

  strong {
    color: #1abc9c;
  }

  img {
    display: block;
    margin: 0 auto;
    border: 0;
    border-radius: 3px;
    max-width: 100% !important;
    height: auto !important;
  }

  a {
    text-decoration: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #1abc9c;
    color: #1abc9c;
  }

  a:hover {
    border-bottom-color: #666;
    color: #666;
  }

  hr {
    border: none;
    border-bottom: 1px dashed #ddd;
    height: 10px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th, td {
    padding: 6px 12px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    color: #666;
  }

  th {
    border-top: 1px solid #ddd;
    text-align: center;
    font-weight: bold;
    background-color: #fbfbfb;
  }
`;
