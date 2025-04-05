// TODO: change the types
interface Task {
  first: string;
  second: string;
  third: string;
}

export default function getPosition(
  task: Task,
  username: string
): "first" | "second" | "third" | null {
  switch (username) {
    case task.first:
      return "first";
    case task.second:
      return "second";
    case task.third:
      return "third";
    default:
      return null;
  }
}
