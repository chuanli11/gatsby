import React, { PureComponent, Component } from 'react';
import theme from '../theme/lambda-theme.js'

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import cx from 'clsx';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import TableContainer from '@material-ui/core/TableContainer';

import MaterialTable from "material-table"
import { forwardRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { useStaticQuery, graphql } from "gatsby"


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(({ palette }) => ({
    table: {
        minWidth: theme.layout.table.minWidth,
    },
    card: {
      borderRadius: 4,
      minWidth: 180,
      height: 220,
      textAlign: 'center',
      border: '1px solid',
      borderColor: palette.grey[500],      
    },
    avatar: {
      width: 60,
      height: 60,
      margin: 'auto',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginTop: 6,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 12,
      color: palette.grey[500],
      marginBottom: '0.675em',
    },
    statLabel: {
      fontSize: 10,
      color: palette.grey[500],
      fontWeight: 400,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      margin: 0,
    },
    statValue: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 2,
      letterSpacing: '1px',
    },
  }));

export default function Empty() {

    const classes = useStyles();

    return (
        <></>       
    );
}

// To use the Style Hook, this function has to be stateless
export function BenchmarkTable(props) {
    const classes = useStyles();
    return(
        // <ResponsiveContainer height={"90%"} >
        <TableContainer className={ classes.table }>
        
            <MaterialTable
                icons={ { ... tableIcons,
                      }}
                title=''
                columns = { props.columns }
                data = { props.data }
                options={{
                    sorting: false,
                    pageSize: theme.layout.table.pageSize,
                    pageSizeOptions: [20, 50],
                    rowStyle: {
                        backgroundColor: theme.palette.table_row.backgroundColor,
                        color: theme.palette.table_row.color
                    },                                                    
                }}            
                detailPanel={[
                    rowData => ({
                        icon: () => <tableIcons.DetailPanel className={props.columns[props.columns.length - 1].hidden ? classes.table_icon_show: classes.table_icon_hide} />,
                        render: rowData => {
                            const items = []
                            props.columns.forEach((arrayItem, index)=>{
                                if (arrayItem.hidden){
                                    items.push(
                                        <ListItem className={classes.detailpanel_ListItem}>
                                            <ListItemText primary={arrayItem.title}  secondary={rowData[arrayItem.field]}  />
                                        </ListItem>                                    
                                    )
                                    if (index < props.columns.length - 1){
                                        items.push(
                                            <Divider component="li" variant="inset" className={classes.detailpanel_dividerInset} />
                                        )
                                    }

                                }}
                            )
                            return (
                                <List className={classes.detailpanel_root}>
                                    {items}
                                </List>
                            );
                        },
                        })

                  ]}                                                         
            />
        
        </TableContainer>
        // </ResponsiveContainer>
      )
}


export function GPUCard(props) {

    const classes = useStyles();

    return 
    (
        <></>       
    );
}

export function GPUProfileCard (props) {
    const styles = useStyles();
    const borderedGridStyles = useGutterBorderedGridStyles({
        borderColor: 'rgba(0, 0, 0, 0.08)',
        height: '50%',
    });

    { console.log(props.item_names) }
    { console.log(props.item_values) }
    return (
        <Card className={cx(styles.card)}>
            <CardContent>
                <h3 className={styles.heading}>{ props.profile_name }</h3>
            </CardContent>
            <Divider light />
            <Box display={'flex'}>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>{ props.item_names[0] }</p>
                    <p className={styles.statValue}>{ props.item_values[0] }</p>
                </Box>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>{ props.item_names[1] }</p>
                    <p className={styles.statValue}>{ props.item_values[1] }</p>
                </Box>
            </Box>
            <Box display={'flex'}>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>{ props.item_names[2] }</p>
                    <p className={styles.statValue}>{ props.item_values[2] }</p>
                </Box>
                <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
                    <p className={styles.statLabel}>{ props.item_names[3] }</p>
                    <p className={styles.statValue}>{ props.item_values[3] }</p>
                </Box>            
            </Box>
        </Card>
    );
};


export function GPUChart(props) {    
    return (
        <ResponsiveContainer width={"95%"} height={"77%"} >
            <BarChart
            layout="vertical"
            data={props.normalized_gpu_data}
            margin={{
                top: 0, right: 0, left: 60, bottom: 0,
            }}
            >
            <YAxis type="category" interval={0} angle={-40} dataKey="name_gpu" textAnchor="end" tick={{fontSize: 15}} />
            <XAxis type="number"/>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="top"/>
            <Bar name="fp16" dataKey="data_fp16" fill="#ecb157" isAnimationActive={false}>
                { props.normalized_gpu_data.map((entry, index) => (
                    <Cell fillOpacity={entry.name_gpu == props.selected_gpu ?  1.0 : 0.5}  />
                ))}                
            </Bar>                 
            <Bar name="fp32" dataKey="data_fp32" fill="#8884d8" isAnimationActive={false}>
                { props.normalized_gpu_data.map((entry, index) => (
                    <Cell fillOpacity={entry.name_gpu == props.selected_gpu ?  1.0 : 0.5}  />
                ))}                
            </Bar> 
            </BarChart> 
        </ResponsiveContainer>
    )
}

export function ModelCard(props) {

    const classes = useStyles();

    return (
        <Card className={ classes.model_card }>
            <CardContent>
                <h3> { props.selected_model } </h3>
                <span>{ props.selected_model_data.task }</span>
            </CardContent>

            <Divider light />

            <Grid container spacing={2}>
                <Grid item xs>
                    <Box >
                    <p>Citations</p>
                    <p> { props.selected_model_data.citation } </p>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box >
                    <p>Year</p>
                    <p>{ props.selected_model_data.year }</p>
                    </Box>
                </Grid>
            </Grid>

            <Divider light />

            <Typography className={classes.model_card_desc} color="textSecondary">
                { props.selected_model_data.desc }
            </Typography>

        </Card>        
    );
}


function getDataByModelName(data, key) {
    const dataArray = data.edges.filter((item)=> item.node.name_model == key)
    return dataArray;
}


function mergeData(data_fp32, data_fp16, key, precision) {
    const merged_model_data = []

    for (var i = 0; i < data_fp32.nodes.length; i++){
        var fp32 = data_fp32.nodes[i][key.toLowerCase().concat('_FP32')];
        var fp16 = key.toLowerCase().concat("_FP16") in data_fp16.nodes[i] ?  data_fp16.nodes[i][key.toLowerCase().concat("_FP16")] : data_fp16.nodes[i][data.selected_model.toLowerCase().concat("_AMP")]
        merged_model_data.push(
            {
                'name_gpu': data_fp32.nodes[i].name_gpu,
                'data_fp32': parseFloat(fp32).toFixed(precision),
                'data_fp16': parseFloat(fp16).toFixed(precision)
            }
        )
        
    }
    return merged_model_data;
}


export function ModelChart(props) {

    const data = useStaticQuery(graphql`
    query {
        allPytorchBenchmarkThroughputFp32Csv {
          nodes {
            name_gpu
            ssd_FP32
            bert_base_squad_FP32
            bert_large_squad_FP32
            gnmt_FP32
            maskrcnn_FP32
            ncf_FP32
            resnet50_FP32
            tacotron2_FP32
            transformerxlbase_FP32
            transformerxllarge_FP32
            waveglow_FP32
          }
        }
        allPytorchBenchmarkThroughputFp16Csv {
          nodes {
            name_gpu
            ssd_AMP
            bert_base_squad_FP16
            bert_large_squad_FP16
            gnmt_FP16
            maskrcnn_FP16
            ncf_FP16
            resnet50_AMP
            resnet50_FP16
            tacotron2_FP16
            transformerxlbase_FP16
            transformerxllarge_FP16
            waveglow_FP16
          }
        }
        allPytorchBenchmarkBsFp32Csv {
          nodes {
            name_gpu
            ssd_FP32
            bert_base_squad_FP32
            bert_large_squad_FP32
            gnmt_FP32
            maskrcnn_FP32
            ncf_FP32
            resnet50_FP32
            tacotron2_FP32
            transformerxlbase_FP32
            transformerxllarge_FP32
            waveglow_FP32
          }
        }
        allPytorchBenchmarkBsFp16Csv {
          nodes {
            name_gpu
            ssd_AMP
            bert_base_squad_FP16
            bert_large_squad_FP16
            gnmt_FP16
            maskrcnn_FP16
            ncf_FP16
            resnet50_AMP
            resnet50_FP16
            tacotron2_FP16
            transformerxlbase_FP16
            transformerxllarge_FP16
            waveglow_FP16
          }
        }
      }
    `)

    const data_fp32 = props.selected_metric == "throughput" ?  data.allPytorchBenchmarkThroughputFp32Csv : data.allPytorchBenchmarkBsFp32Csv
    const data_fp16 = props.selected_metric == "throughput" ?  data.allPytorchBenchmarkThroughputFp16Csv : data.allPytorchBenchmarkBsFp16Csv
    const precision = props.selected_metric == "throughput" ?  2 : 0

    const merged_model_data = mergeData(data_fp32, data_fp16, props.selected_model)
    const max_throughput = Math.max.apply(Math, merged_model_data.map(function(o) { return o.data_fp16; }))
    console.log(merged_model_data)

        return (
                <BarChart
                    width={500}
                    height={400}
                    layout="vertical"
                    data={merged_model_data}
                    margin={{
                        top: 15, right: 0, left: 40, bottom: 0,
                    }}
                    >
                    <YAxis type="category" interval={0} angle={-40} dataKey="name_gpu" textAnchor="end" tick={{fontSize: 15}} />
                    <XAxis type="number" domain={[0, Math. round(( max_throughput * 1.1) / 100) * 100]}/>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="top"/>
                    <Bar name="fp16" dataKey="data_fp16" fill="#ecb157" isAnimationActive={false}>
                        { merged_model_data.map((entry, index) => (
                            <Cell fillOpacity={entry.name_gpu == props.selected_gpu ?  1.0 : 1.0}  />
                        ))}                
                    </Bar>                 
                    <Bar name="fp32" dataKey="data_fp32" fill="#8884d8" isAnimationActive={false}>
                        { merged_model_data.map((entry, index) => (
                            <Cell fillOpacity={entry.name_gpu == props.selected_gpu ?  1.0 : 1.0}  />
                        ))}                
                    </Bar> 
                </BarChart>             
        ) 
    // }
}


const mydata = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


export class Example extends PureComponent {

  render() {
    return (
      <BarChart width={150} height={40} data={mydata}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    );
  }
}

