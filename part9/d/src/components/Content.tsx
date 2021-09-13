interface ContentProps {
  name: string,
  exerciseCount: number
}

const Content = ({name, exerciseCount}: ContentProps) => (
  <p>
    {name} {exerciseCount}
  </p>
);

export default Content;
