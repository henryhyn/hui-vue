import baseStyled from './baseStyled';
import normal from './normal';

const wxStyles = [
  { value: '橙心', wxStyle: baseStyled() },
  { value: '兰青', wxStyle: baseStyled({ primary: '#009688', secondary: '#fbf9fd' }) },
  { value: '绿意', wxStyle: baseStyled({ primary: '#35b378', secondary: '#fbf9fd' }) }
];

export {
  wxStyles,
  normal
};
