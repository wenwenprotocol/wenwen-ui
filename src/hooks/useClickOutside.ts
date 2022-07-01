import React, { useState, useEffect } from 'react'

const useClickOutside = (el: React.MutableRefObject<any>, initialState: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }

  }, [isActive, el])

  return [isActive, setIsActive]
}

export default useClickOutside