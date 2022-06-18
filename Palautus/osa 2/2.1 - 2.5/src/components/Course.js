import React from "react";

const Course = (props) => {
    console.log(props.course.name);
    return (
      <>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </>
    );
  };
  
  const Header = (props) => {
    console.log(props);
    return <h1> {props.course.name} </h1>;
  };
  
  const Total = (props) => {
    console.log(props.course.parts);
    const total = props.course.parts.reduce((s, p) => ({
      exercises: s.exercises + p.exercises, // pöllin tän stackoverflowsta
    }));
    console.log(total);
    return <b> {"total of " + total.exercises + " exercises"} </b>
  };
  
  const Content = (props) => {
    console.log(props.course.parts[0].id);
    return (
      <div>
        {props.course.parts.map((part) => (
          <Part
            key={part.id}
            name={props.course.parts[part.id - 1].name}
            exercises={props.course.parts[part.id - 1].exercises}
          />
        ))}
      </div>
    );
  };
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };


export default Course