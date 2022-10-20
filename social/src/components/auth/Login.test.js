import {render as rtlRender, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import Login from './Login'
import { createStore } from "redux";
import reducer from "../../store";
import React, { Component } from "react";
import { Provider } from "react-redux"


afterEach(cleanup)

function renderWithRedux(component,{initialState,store=createStore(reducer,initialState)}){
    return{
        ...render(<Provider store ={store}>{component}</Provider>)
    }
}


it('should logg in successfully',()=>{
    const{login}=renderWithRedux(<Login/>)
})