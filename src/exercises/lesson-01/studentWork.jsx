//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Kamila';
  const age = 39;
  const hobbies = ['Reading', 'Coding', 'Baking'];

  return (
    <div>
      {/* add JSX here */}
      <h1>About Me</h1>
      <p>
        {' '}
        Hi! My name is {name}. I am {age} years old. I learn React with Code the
        Dream. I enjoy growing my skills in programming and creating new
        projects.{' '}
      </p>
      <h2>My hobbies</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
