import { gql, useQuery } from '@apollo/client';
import VisitBeanEntry from './VisitBeanEntry';

export default function VisitBeanList({ flag, userId }) {
  const GET_REVIEWS = gql`
  query BeansByUser($user_id: String!, $visited: Boolean!) {
    beansByUser(user_id: $user_id, visited: $visited ) {
      id
      shop_id
      shop_name
      visited
    }
  }
`;

  const { data, loading, err } = useQuery(GET_REVIEWS, {
    variables: {
      user_id: userId,
      visited: flag,
    },
  });

  // if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  data ? console.log(data.beansByUser) : null;

  return (
    <div>
      {/* {data ? data.beansByUser : null} */}
      {data ?
        data.beansByUser.length === 0 ?
          'Discover more shops first!' :
          data.beansByUser.map((shop) => <VisitBeanEntry shop={shop} />) : null}
      {/* {!data ? 'Discover more shops!' : null} */}
    </div>
  );
}
