import {
  Container,
  Main,
} from './styles';

import AuthIllustration from '../../assets/auth-illustration.png';

export interface Props {
  title: string;
  children: React.ReactNode;
}

const SignUp: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <aside>
        <img src={AuthIllustration} role='presentation' alt='' />
      </aside>
      <Main>
        <article>
          <h1>{title}</h1>
          {children}
        </article>
      </Main>
    </Container>
  )
}

export default SignUp;
