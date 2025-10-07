import React, { useState } from 'react'
import '../App/App.scss'

export const App = () => {
    const [title, setTitle] = useState('')
    const [itemTitle, setItemTitle] = useState('')
    const [cards, setCards] = useState([
      {id: 1, order: 1, isChange: false, isVal: false, title: 'Column-1', data: [
        // {title: 'asdfgtyhjkjhgfd', id: 1}
      ]},
      {id: 2, order: 2, isChange: false, sVal: false, title: 'Column-2', data: [
        // {title: 'lorem', id: 1}
      ]},
    ])
    const [currentCard, setCurrentCard] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [cardCurrentCard, setCardCurrentCard] = useState()
    const [isClicked, setIsClicked] = useState(false)


    const addColumn = (id) =>{
      if(title.trim()){
        cards.push({id: id, order: id,isChange: false, sVal: false, title: title.trim(), data: []})
        // console.log(cards);
        setTitle('')
      }else{
        alert('Заполните поле')
      }
      
    }

    const addItem = (id) =>{
      if(!itemTitle){
        return
      }

      // setTextVal(id)
      cards.map(card=>{
        if(card.id === id){
          return(
            {...card, data: card.data.push({title: itemTitle, isChanged: false})}
          ) 
        }
        return card
      })
      setItemTitle('')
      // console.log(cards);
      setCards(cards.map(card=>{
        if(card.id === id){
          // console.log('hi');
          return {...card, isVal: false}
        }
        return card
      }))
      // setCards(cards)
    }

    function dragOverHandler(e){
      e.preventDefault()
    }

    function dragStartHandler(e, card, item){
      setCurrentCard(card)
      setCurrentItem(item)
    }

    function dragCardStartHandler(e, card){
      setCardCurrentCard(card)
    }

    function dropHandler(e, card, item){
      e.preventDefault()
      const currentInd = currentCard.data.indexOf(currentItem)
      currentCard.data.splice(currentInd, 1)
      const addInd = currentCard.data.indexOf(item)
      currentCard.data.splice(addInd + 1, 0, currentItem)
      // setUniqArr()
      setCards(cards.map(obj=>{
        if(obj.id === currentCard.id){
          return currentCard
        }
        return obj
      }))
    }

    

    function dropCardBlockHandler(e, card){
      if(currentCard === card){
        return
      }
      card.data.push(currentItem)
      const currentInd = currentCard.data.indexOf(currentItem)
      currentCard.data.splice(currentInd, 1)
      setCards(cards.map(obj=>{
        if(obj.id === card.id){
          return card
        }
        if(obj.id === currentCard.id){
          return currentCard
        }
        return obj
      }))
      // console.log(cards);
    }

    function dropCardHandler(e, card){
      e.preventDefault()
      setCards(cards.map(obj=>{
        if(obj.id === card.id){
          return {...obj, order: cardCurrentCard.order}
        }
        if(obj.id === cardCurrentCard.id){
          return {...obj, order: card.order}
        }
        return obj
      }))
    }

    const sortCards = (a, b) => {
      if(a.order > b.order){
        return 1
      }else{
        return -1
      }
    }

    const deleteCard = (id) =>{
      setCards(cards.filter(el => el.id !== id))
    }

    const deleteItem = (text) =>{
      setCards(cards.map(el=> (
        {...el, data: el.data.filter(t => t.title !== text)}
      )))
    }

    const changeCard=(id)=>{
      setCards(cards.map(card=>{
        if(card.id === id){
          // console.log('hi');
          return {...card, isChange: true}
        }
        return card
      }))
    }

    const getChangedCard=(e, id, text)=>{
      // console.log(e.key);
      if(e.key === 'Enter'){
        setCards(cards.map(card=>{
          if(card.id === id){
            // console.log('hi');
            return {...card, title: text, isChange: false}
          }
          return card
        }))
        setIsClicked(false)
      }
    }

    const changeItem = (text) =>{
      // let newArr = []
      setCards(
        cards.map(card=>{
          let timeArr = []
          timeArr =
          card.data.map(item=>{
            if(item.title === text){
              // console.log({...item, isChanged: true});
              return {...item, isChanged: true}
            }
            return item
          })
          return {...card, data: timeArr}
        })
      )
      // console.log(newArr);
    }

    const getChangedItem=(e, text, desc)=>{
      // console.log(e.key);
      if(e.key === 'Enter'){
        // let newArr = []
        // newArr =
          setCards(cards.map(card=>{
            let timeArr = []
            timeArr =
            card.data.map(item=>{
              if(item.title === text){
                // console.log({...item, isChanged: false});
                return {...item, title: desc, isChanged: false}
              }
              return item
            })
            return {...card, data: timeArr}
          })
        )
        setIsClicked(false)
      }
    }

    const resetInp = (id) =>{
      setCards(cards.map(card=>{
        if(card.id === id){
          // console.log('hi');
          return {...card, isVal: true}
        }
        return card
      }))
    }

    const [isDrag, setIsDrag] = useState()

  return (
    <div className='trello'>
        <div className='trello__container'>
            {cards.sort(sortCards).map((card, ind)=>{
              return(
                <div key={ind} className='trello__block' 
                  onDragOver={(e)=>{ isDrag ? dragOverHandler(e) : console.log()}}
                  onDrop={(e)=>{isDrag ? dropCardBlockHandler(e, card) : console.log()}}
                  >
                    <div className="trello__title"
                     onMouseEnter={() => {setIsDrag(false)}}
                     onMouseLeave={() => setIsDrag(true)}
                     onDragStart={(e)=>{dragCardStartHandler(e, card)}}
                     draggable={true}
                     onDragOver={(e)=>{dragOverHandler(e)}}
                     onDrop={(e)=>{dropCardHandler(e, card)}}
                     >
                     {card.isChange ? 
                     <input
                      value={isClicked ? null : card.title}
                      onClick = {()=>{setIsClicked(true)}}
                      onKeyPress={(e)=>{getChangedCard(e, card.id, e.target.value)}}
                      type="text"/> : <span>{card.title}</span>}
                       <div className="trello__card_btns">
                          <div className="trello__card_change" onClick={()=>{changeCard(card.id)}}><img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="" /></div>
                          <div className="trello__card_del" onClick={()=>{deleteCard(card.id)}}>X</div>
                        </div>
                     </div>
                    {card.data.map(item=>{
                      return(
                        <div
                          draggable={true}
                          onDragOver={(e)=>{dragOverHandler(e)}}
                          onDrop={(e)=>{dropHandler(e, card, item)}}
                          onDragStart={(e)=>{dragStartHandler(e, card, item)}}
                          className="trello__item">{item.isChanged ? 
                          <input 
                            value={isClicked ? null : item.title}
                            onClick = {()=>{setIsClicked(true)}}
                            type="text" 
                            onKeyPress={(e)=>{getChangedItem(e, item.title, e.target.value)}} 
                            /> : item.title}
                          <div className="trello__item_btns">
                            <div onClick={()=>{changeItem(item.title)}} className="trello__item_change"><img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="" /></div>
                            <div className="trello__item_del" onClick={()=>{deleteItem(item.title)}}>x</div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="trello__item">
                      {card.isVal ?
                        <label className="trello__item_label">
                        <input 
                        value={itemTitle} 
                        onChange={(e)=>{setItemTitle(e.target.value)}} 
                        className="trello__item_inp" placeholder='Добавить карточку' type="text"/>
                        <button onClick={(e)=>{addItem(card.id)}} className="trello__item_btn">+</button>
                    </label> : <div onClick={()=>{resetInp(card.id)}} className="trello__add">Добавить карточку</div>
                    }
                    </div>
                </div>
              )
            })}
            <div className="trello__block">
              <label htmlFor="" className='trello__card_label'>
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className='trello__card_inp' placeholder='Добавить список' type="text" />
                <button onClick={()=>{addColumn(cards.length+1)}} className='trello__card_btn'>+</button>
              </label>
            </div>
        </div>
    </div>
  )
}
