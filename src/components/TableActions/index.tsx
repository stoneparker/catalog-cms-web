import Button from '../Button';

import { Container } from './styles';

export interface Props {
  options: {
    title: string,
    action: () => void,
  }[]
}

const TableActions: React.FC<Props> = ({ options }) => {
  return (
    <Container>
      { options.map((option, index) => (
        <Button key={index} onClick={option.action}>{option.title}</Button>
      ))}
    </Container>
  )
}

export default TableActions;