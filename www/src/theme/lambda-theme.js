import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    table_icon: {
      color: '#d8d8d8'
    },
    table_row: {
      backgroundColor: '#272727',
      color: '#d8d8d8'
    },
    table_detailpanel: {
      backgroundColor: 'white',
      color: 'black'
    }
  },

  layout: {
    table: {
      minWidth: 100,
      pageSize: 10,
      column: {
        max_width: 130,
        min_width: 50,
        margin: "0px 20px",
        padding: "0px 20px",
      },
      first_column: {
        width: "50px",
        textAlign: "right",
        paddingRight: "150px"
      }
    },
    table_detailpanel: {
      width: '100%',
      dividerInset_width: '200px',
      listItem_paddingLeft: 10 
    },
    gpu_page: {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: 10,
        textAlign: 'center',
        color: 'black',
      },      
    }
  },

  data: {
    chart_gpu_normalizer: 'V100'
  }
});

export default theme;
