import { useRef, useState, useCallback } from "react"
import classes from './UI/global.module.css'

const App = () => {
  const [user, setUsers] = useState([
    {name: 'Zorik', surname: 'Karapetyan', age: 17, id: 1},
    {name: 'Narek', surname: 'Ghazaryan', age: 33, id: 2},
    {name: 'Meri', surname: 'Khachatryan', age: 25, id: 3},
  ]);

  const [checkedUser, setCheckedUser] = useState(
    new Array(user.length).fill(false)
  )

  const [nextUserId, setNextUserId] = useState(4);
  const [searchName, setSearchName] = useState('');

  const handlechange = (pos) => {
  const updatedCheckedUser = checkedUser.map((el, ind) =>
  ind === pos ? !el : el
);
setCheckedUser(updatedCheckedUser)
  }

  const deleteAlotItems = () => {
  let newUsers = user.filter((el,ind) => {
    if(!checkedUser[ind]){
      return el
    } 
  })

  let newarr = checkedUser.fill(false) 
  setCheckedUser(newarr)
  setUsers(newUsers)
  }


  const deleteUser = (id) => {
    const updatedUsers = user.filter(el => el.id !== id);
    setUsers(updatedUsers)
  }

  let nameRef = useRef('')
  let surnameRef = useRef('')
  let ageRef = useRef('')

  const addNewUser = () => {
    let newUser = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      age: ageRef.current.value,
      id: nextUserId
    }
    setUsers(user.concat(newUser))
    setNextUserId(nextUserId + 1)
    let newarr = new Array(user.length + 1).fill(false)
    setCheckedUser(newarr)
    console.log(user);
  }

  const searchUser = (event) => {
    setSearchName(event.target.value)
  }

  const filterByName = useCallback(
    (item) => {
      return item.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
    }, [searchName]
  )

  return (
    <section>
        
          <div className={classes['container']}>    
            <label>New User Name</label><input ref={nameRef} type="text" />
            <label>New User SurName</label ><input ref={surnameRef} type="text"/>
            <label>New User Age</label><input ref={ageRef} type='number' />
            <button className={classes['boo']} onClick={() => addNewUser()}>Add New User</button>
        </div>
        <div>
            <label>Search Name</label> <input onChange={searchUser} type="text" />
        </div>
          
        
      <div className={classes['seccontainer']}>
      {user.filter(filterByName).map((el,ind) => {
        return (
          <div className={classes['item']}>
            <input type="checkbox" name={el.name} value={el.name} checked={checkedUser[ind]} onChange={() => handlechange(ind)} />
            <p>name: {el.name}</p>
            <p>surname: {el.surname}</p>
            <p>age: {el.age}</p>
            <button onClick={() => deleteUser(el.id)}>Delete User</button>
          </div>
        )
      })}
          
      </div>
      <button onClick={deleteAlotItems}>Delete Items</button>
    </section>
    
  )
}

export default App