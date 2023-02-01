import React from 'react'
import kanban from '../data'

export default function SideNavigation() {
    
  return (
    <nav className="side-nav">
        <div className='logo'>
            kanban
        </div>
        <div className='boards'>
            <label>Boards ({kanban.boards.length})</label>
        </div>
    </nav>
  )
}
