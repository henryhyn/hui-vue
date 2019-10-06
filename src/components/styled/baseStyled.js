export default (colors = {
  primary: 'rgb(239, 112, 96)',
  secondary: '#fff9f9'
}) => `
  h2 {
    border-bottom: 2px solid ${colors.primary};
  }

  h2 span {
    color: white;
    background-color: ${colors.primary};
    padding: 3px 10px 1px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    display: inline-block;
  }
  
  h2:after {
    display: inline-block;
    content: " ";
    vertical-align: bottom;
    border-bottom: 36px solid ${colors.secondary};
    border-right: 20px solid transparent;
  }
  
  blockquote {
    border-left-color: ${colors.primary};
    background-color: ${colors.secondary};
  }
  
  a {
    border-bottom-color: ${colors.primary};
    color: ${colors.primary};
  }

  p code, li code {
    color: ${colors.primary};
  }
  
  strong {
    color: ${colors.primary};
  }  
`;
