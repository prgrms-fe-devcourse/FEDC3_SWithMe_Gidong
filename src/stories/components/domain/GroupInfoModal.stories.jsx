import { useState } from 'react';
import GroupInfoModal from '@/components/domain/GroupInfoModal';

export default {
  title: 'Components/GroupInfoModal',
  component: GroupInfoModal,
};

export function Default() {
  const [visible, setVisible] = useState(false);
  const group = {
    name: '그룹이름그룹이름그룹이름그룹이름그룹이름',
    description: {
      master: {
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        posts: [
          {
            _id: 'id_master_post1',
            channel: '그룹이름그룹이름그룹이름그룹이름그룹이름',
            createdAt: '2023-01-12T15:12:40.811Z',
            updatedAt: '2023-01-12T15:12:40.811Z',
          },
          {
            _id: 'id_master_post2',
            channel: '그룹이름그룹이름그룹이름그룹이름그룹이름',
            createdAt: '2023-01-13T15:12:40.811Z',
            updatedAt: '2023-01-13T15:12:40.811Z',
          },
          {
            _id: 'id_master_post1',
            channel: '다른그룹1',
            createdAt: '2023-01-12T15:12:40.811Z',
            updatedAt: '2023-01-12T15:12:40.811Z',
          },
          {
            _id: 'id_master_post2',
            channel: '다른그룹2',
            createdAt: '2023-01-13T15:12:40.811Z',
            updatedAt: '2023-01-13T15:12:40.811Z',
          },
        ],
        fullName: 'master',
        _id: '63bd24fd4b0e607612a82be9',
      },
      tagList: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      intro:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      member: [
        {
          image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
          posts: [
            {
              _id: 'id_member1_post1',
              channel: '그룹이름그룹이름그룹이름그룹이름그룹이름',
              createdAt: '2023-01-12T15:12:40.811Z',
              updatedAt: '2023-01-12T15:12:40.811Z',
            },
            {
              _id: 'id_member1_post2',
              channel: '그룹이름그룹이름그룹이름그룹이름그룹이름',
              createdAt: '2023-01-13T15:12:40.811Z',
              updatedAt: '2023-01-13T15:12:40.811Z',
            },
            {
              _id: 'id_member1_post3',
              channel: '다른그룹1',
              createdAt: '2023-01-12T15:12:40.811Z',
              updatedAt: '2023-01-12T15:12:40.811Z',
            },
            {
              _id: 'id_member1_post4',
              channel: '다른그룹2',
              createdAt: '2023-01-13T15:12:40.811Z',
              updatedAt: '2023-01-13T15:12:40.811Z',
            },
          ],
          fullName: 'member1',
          _id: '63bd24fd4b0e607612a82bf0',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
          posts: [],
          fullName: 'member2',
          _id: '63bd24fd4b0e607612a82bf2',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
          posts: [],
          fullName: 'member3',
          _id: '63bd24fd4b0e607612a82bf3',
        },
        {
          image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
          posts: [],
          fullName: 'member4',
          _id: '63bd24fd4b0e607612a82bf4',
        },
      ],
    },
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show GroupInfoModal</button>
      <GroupInfoModal group={group} visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}
