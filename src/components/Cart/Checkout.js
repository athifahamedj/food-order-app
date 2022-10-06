import React, {useRef, useState} from "react";
import classes from "./Checkout.module.css"

  const isEmpty = value=>value.trim() === '';
  const isCharac = value=>value.trim().length !== 6 ;

	const Checkout =(props)=>{

    const[isFormValidity, setIsFormValidity] = useState({
      name:true,
      street:true,
      postal:true,
      city:true,
    });

    const isName = useRef();
    const isStreet = useRef();
    const isPostal = useRef();
    const isCity = useRef();
   
		const onSubmitCheckout = (event) => {
			event.preventDefault();
      const getName = isName.current.value;
      const getStreet = isStreet.current.value;
      const getPostal = isPostal.current.value;
      const getCity = isCity.current.value;
      // console.log(getName);
      const isValidName =  !isEmpty(getName);
      const isValidStreet=  !isEmpty(getStreet);
      const isValidPostal =  !isEmpty(getPostal);
      const isValidCity =  isCharac(getCity);

      setIsFormValidity({
        name:isValidName,
        street:isValidStreet,
        postal:isValidPostal,
        city:isValidCity,
      })

      const isFormValid = isValidName && isValidStreet && isValidPostal && isValidCity;
      if(!isFormValid){ return ; }


    props.onConfirm({
      name:getName,
      street:getStreet,
      city:getCity,
      postal:getPostal,

    })
		}
	return (<React.Fragment>
	<form onSubmit={onSubmitCheckout} className={classes.form}>
		<div className={classes.control}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name' ref={isName} />
      {!isFormValidity.name && <p>Please Enter Your Name</p>}
    </div>
     <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={isStreet}/>
        {!isFormValidity.street && <p>Please Enter Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={isPostal} />
        {!isFormValidity.postal && <p>Please Enter Code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={isCity} />
        {!isFormValidity.city && <p>Please Enter City</p>}
      </div>
      <div className={classes.actions}>
			<button type="button" onClick={props.onCancel}>Cancel</button>
      <button className={classes.submit}>Confirm</button>
      </div>
      
	</form>
	</React.Fragment>)

	}

export default Checkout