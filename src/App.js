
import './App.css';
import { useState, React, useEffect} from "react";
import { Container } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select, MenuItem,InputLabel,makeStyles,NativeSelect } from "@material-ui/core";
import Header from './component/header'

const useStyles = makeStyles((theme) => ({
  margin: {
    padding: theme.spacing(1),
    margin:"0 25px",
    backgroundColor:'rgb(244,244,244)',
    position:'sticky'
  },
  opMenu:{
    
  }
}));

function App() 
{
  
  const axios = require("axios");
  const [userData, setUserData] = useState([]);
  const [columnTitles, setColumnTitles] = useState([]);
  const [tableBody, setTableBody] = useState();
  const [filteredObj, setFilteredObj] = useState([])
  const [searchWord, setSearchWord] =useState("");
  const [searchMode, setSearchMode] = useState("");
  const [sortMode, setSortMode] = useState("");
  const [sorted, setSorted] = useState([]);
  const [isLoaded, setIsLoaded]= useState(false);
  const classes = useStyles();

    async function getUserInfo(){
      const response = await axios({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET"
      })
      setUserData(response.data);
      // Table Head Data
      setColumnTitles(Object.values(response.data).map((key) =>
      (Object.entries(key).map((item) =>(
        (typeof item[1] === 'object') ?
          Object.entries(item[1]).map(item2 =>(
            (typeof item2[1] === 'object') ?
            (Object.entries(item2[1]).map(item3 =>
              (item3[0]))):
              item2[0])): 
          item[0]
        )//item map
      )//key1 map 
      )//key map
      ))
    // Table Body Data
    setTableBody(Object.values(response.data).map((key) =>
    (Object.entries(key).map((item) =>(
      (typeof item[1] === 'object') ?
        Object.entries(item[1]).map(item2 =>(
          (typeof item2[1] === 'object') ?
          (Object.entries(item2[1]).map(item3 =>
              item3[1])):
            item2[1])): 
        item[1])//item map
    )//key1 map 
    )//key map
    )//user data map)
    )
    setIsLoaded(true);
    
};

useEffect(()=>{getUserInfo()},[])
console.log(sortMode)

function sortData(){
  console.log('sorting...')
  console.log(sortMode)
  if(sortMode==="name"){
  setSorted(userData.map(item=>(item.name)))
  setSorted(sorted=>sorted.sort())
  console.log(sorted)
  Object.values(userData).map((key,index)=>(key.name===sorted[index])?
  (setTableBody(Object.entries(key).map((item) =>(
      (typeof item[1] === 'object') ?
        Object.entries(item[1]).map(item2 =>(
          (typeof item2[1] === 'object') ?
          (Object.entries(item2[1]).map(item3 =>
            (item3[1]))):
            item2[1])): 
        item[1])//item map
    )//key1 map 
    )//key map
    )//user data map)
    :"")}else{return;}
    
}

//####################################### search table ##############################################
const searchTableBody = e =>{
  e.preventDefault();
  console.log(searchWord)
  if(searchMode==="name"){
    let match=0;
    console.log(Object.values(userData).map((item)=>(item.name===searchWord)),searchWord)
  Object.values(userData).map(item=>(item.name.toLowerCase()===searchWord.toLowerCase())?
(match++,
setFilteredObj(Object.values(item).map((key) =>
(Object.entries(key).map((item) =>(
  (typeof item[1] === 'object') ?
    Object.entries(item[1]).map(item2 =>(
      (typeof item2[1] === 'object') ?
      (Object.entries(item2[1]).map(item3 =>
          item3[1])):
        item2[1])): 
     item[1])//item map
)//key1 map 
)//key map
)//user data map)
)//user data map)
  ):((match===0)?setFilteredObj(`no results for ${searchWord}`):""))}
  else if(searchMode==="username"){
    let match=0;
    Object.values(userData).map(item=>(item.username.toLowerCase()===searchWord.toLowerCase())?
    (match++,
    setFilteredObj(Object.values(item).map((key) =>
  (Object.entries(key).map((item) =>(
    (typeof item[1] === 'object') ?
      Object.entries(item[1]).map(item2 =>(
        (typeof item2[1] === 'object') ?
        (Object.entries(item2[1]).map(item3 =>
          (item3[1]))):
          item2[1])): 
      item[1])//item map
  )//key1 map 
  )//key map
  )//user data map)
  )):((match===0)?setFilteredObj(`no results for ${searchWord}`):""))}
  else if(searchMode==="email"){
    let match=0;
    Object.values(userData).map(item=>(item.email.toLowerCase()===searchWord.toLowerCase())?
    (match++,
    setFilteredObj(Object.values(item).map((key) =>
  (Object.entries(key).map((item) =>(
    (typeof item[1] === 'object') ?
      Object.entries(item[1]).map(item2 =>(
        (typeof item2[1] === 'object') ?
        (Object.entries(item2[1]).map(item3 =>
          (item3[1]))):
          item2[1])): 
      item[1])//item map
  )//key1 map 
  )//key map
  )//user data map)
    )
    ):((match===0)?setFilteredObj(`no results for ${searchWord}`):""))}
  else if(searchMode==="phonenumber"){
    let match=0;
    Object.values(userData).map(item=>(item.phone===searchWord)?
    (match++,
    setFilteredObj(Object.values(item).map((key) =>
  (Object.entries(key).map((item) =>(
    (typeof item[1] === 'object') ?
      Object.entries(item[1]).map(item2 =>(
        (typeof item2[1] === 'object') ?
        (Object.entries(item2[1]).map(item3 =>
          (item3[1]))):
          item2[1])): 
      item[1])//item map
  )//key1 map 
  )//key map
  )//user data map)
  )):((match===0)?setFilteredObj(`no results for ${searchWord}`):""))}
  else if(searchMode==="city"){
    let match=0;
    Object.values(userData).map(item=>(item.address.city.toLowerCase()===searchWord.toLowerCase())?
    (match++,
    setFilteredObj(Object.values(item).map((key) =>
  (Object.entries(key).map((item) =>(
    (typeof item[1] === 'object') ?
      Object.entries(item[1]).map(item2 =>(
        (typeof item2[1] === 'object') ?
        (Object.entries(item2[1]).map(item3 =>
          (item3[1]))):
          item2[1])): 
      item[1])//item map
  )//key1 map 
  )//key map
  )//user data map)
  )):((match===0)?setFilteredObj(`no results for ${searchWord}`):""))}
   //   return <TableCell>{tableBody.map(item=>(item.name===x))}</TableCell>
    }

    
//######################################## Handle change keys ######################################
const handleChangeKeys=(e)=>{
  console.log(e.target.value)
  setSearchWord(e.target.value)
}
//######################################### handle sort and search change #########################################
const handleSearchChange=(e)=>{
  console.log(e.target.value)
  setSearchMode(e.target.value)
}
const handleSortChange=(e)=>{
  console.log(e.target.value)
  setSortMode(e.target.value)
  console.log(sortMode)
  sortData()
}
//######################################## general debugging ###############################################
// console.log(userData, ' user data')
// console.log(mode, ' mode')
// console.log(tableBody, 'table body')
// console.log(isLoaded, ' is loaded')
// console.log(filteredObj, ' filtered search')
//console.log(sorted,'sorted')


if(isLoaded===true){
return (
 <div className="App">
   <Header/>
   <div id="search-area">
     <div id="search-tools">
     <div>
        <FormControl component="fieldset">
        <FormLabel component="legend">Search By</FormLabel>
        <Select onChange={handleSearchChange} defaultValue="">
          {/* {columnTitles[0].map((item)=>(typeof item==='object')?(Object.values(item).map(item2=>(<MenuItem value={item2}>{` ${item2}`}</MenuItem>))):(<MenuItem value={item}>{item}</MenuItem>))} */}
          <MenuItem value="name" >Name</MenuItem>
          <MenuItem value="city" >City</MenuItem>
          <MenuItem value="username" >User Name</MenuItem>
          <MenuItem value="email" >Email</MenuItem>
          <MenuItem value="phonenumber" >Phone Number </MenuItem>
        </Select>
        </FormControl></div>
        <div><form onSubmit={searchTableBody}><TextField onChange={handleChangeKeys} variant="outlined"></TextField></form></div>
    </div>
    <div id="results-display">
    <div id="results-display-body">{filteredObj}</div>
    </div>
    </div>
  
      <div className="table">
      <div className={classes.margin}>
        <FormControl className={classes.opMenu} component="fieldset">
        <FormLabel>SORT</FormLabel>
        <Select onChange={handleSortChange} defaultValue="">
        <MenuItem value="name">Name</MenuItem>
          </Select>
          </FormControl></div>
        <div className="table-item-container">
      <div className="head-item">{columnTitles[0].map((item)=>(typeof item==='object')?(Object.values(item).map(item2=>(<div className="item-cell">{` ${item2}`}</div>))):(<div className="item-cell">{item}</div>))}</div>
          {tableBody.map((key,index)=>(
            <div className="body-item">
              {
              tableBody[index].map(item=>
              (typeof item==='object')?((Object.values(item).map((item2)=>(<div className="item-cell" >{` ${item2}`}</div>)))):
              <div className="item-cell">{item}</div>)}
            </div>))}
            </div>
            </div>
</div>
);
}else{return(<Container><CircularProgress />...Loading</Container>);}

}

export default App
