import React, {useEffect, useRef, HTMLProps} from 'react';


function SelectionCheckBox ({
  indeterminate,
  className='',
  ...rest
}:{ indeterminate ?: boolean} & HTMLProps<HTMLInputElement>) {

  const ref = useRef<HTMLInputElement>(null!);
  const ch = rest.checked;

  useEffect(()=>{
    if(typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !ch && indeterminate
    }
  },[ref, indeterminate, ch])

  return (
    <input 
      type="checkbox"
      ref={ref}
      className={className + ` cursor-pointer`}
      {...rest}
    />
  )
}

export default SelectionCheckBox;

