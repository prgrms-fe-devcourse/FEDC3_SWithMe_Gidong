import { Button, Icon, SearchBar, Tag, Text } from '@/components/base';
import { Introduction, Member, MemberList } from '@/components/domain/groupInfo';
import { useAuthContext } from '@/context/AuthProvider';
import { useUserContext } from '@/context/UserProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import {
  StyledButtonWrapper,
  StyledContentContainer,
  StyledHeaderContainer,
  StyledMemberListContainerLabel,
  StyledModal,
} from './styles';
import { useUpdateGroup } from '@/hooks/queries/group';
import { useQueryClient } from '@tanstack/react-query';

function GroupInfoModal({ group, visible, onClose, ...props }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const { mutate: updateGroupMutate } = useUpdateGroup();
  const queryClient = useQueryClient();

  const { users } = useUserContext();

  const { name, description, _id } = group;
  const { master: masterId, tagList, intro, member: memberIds } = description;
  const { value, onChange } = useInput('');

  const [member, setMember] = useState();
  const [master, setMaster] = useState();

  useEffect(() => {
    const getMemberInfo = () => {
      return [...users, loggedUser].filter((user) => memberIds.includes(user._id));
    };

    const getMasterInfo = () => {
      return [...users, loggedUser].filter((user) => user._id === masterId)[0];
    };

    if (description && users) {
      setMember(getMemberInfo());
      setMaster(getMasterInfo());
    }
  }, [description, users]);

  const checkWriteTIL = (posts) => {
    return posts.filter(
      ({ channel, createdAt }) =>
        channel === name && new Date(createdAt).toLocaleDateString('ko-kr') === new Date().toLocaleDateString('ko-kr'),
    ).length;
  };

  const handleModalClose = () => {
    onClose && onClose();
  };

  const handleWithdrawButtonClick = async () => {
    if (!confirm('정말 탈퇴하시겠습니까?')) {
      return;
    }

    const data = {
      _id,
      name,
      description: JSON.stringify({
        ...description,
        member: [...memberIds.filter((memberId) => memberId !== loggedUser._id)],
      }),
    };
    updateGroupMutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(['groupList'], { exact: true }, { refetchType: 'all' });
        onClose && onClose();
      },
    });
  };

  return (
    <StyledModal visible={visible} onClose={handleModalClose} style={{ ...props.style }} {...props}>
      <StyledHeaderContainer>
        <span />
        <Text size='huge' weight={700}>
          {name}
        </Text>
        <Icon size='large' isPointer={true} onClick={handleModalClose} />
      </StyledHeaderContainer>
      <StyledContentContainer>
        <Tag tagList={tagList} fontsize='default' style={{ marginBottom: '1rem' }} />
        {intro ? (
          <Introduction intro={intro} />
        ) : (
          <Text size='xLarge' weight={300}>
            그룹에 등록된 소개가 없습니다!
          </Text>
        )}
        <StyledMemberListContainerLabel>
          <SearchBar placeholder='찾고 싶은 그룹원의 이름을 검색하세요.' value={value} onChange={onChange} />
          <Text size='medium' color={COLOR.GRAY2}>
            <Icon type='regular' name='face-smile' size='small' /> : 오늘 TIL 작성자
          </Text>
        </StyledMemberListContainerLabel>
        {master && member && (
          <MemberList>
            <Member image={master.image} fullName={master.fullName} isMaster={true}>
              {checkWriteTIL(master.posts) ? <Icon type='regular' name='face-smile' size='medium' /> : null}
            </Member>
            {member
              .filter(({ fullName }) => fullName.includes(value))
              .map(({ image, fullName, _id, posts }) => {
                return (
                  <Member key={_id} image={image} fullName={fullName}>
                    {checkWriteTIL(posts) ? <Icon type='regular' name='face-smile' size='medium' /> : null}
                  </Member>
                );
              })}
          </MemberList>
        )}
        {loggedUser._id !== masterId && (
          <StyledButtonWrapper>
            <Button version='transparent' onClick={handleWithdrawButtonClick}>
              <Text color={theme.colors.black_400} underline>
                그룹 탈퇴하기
              </Text>
            </Button>
          </StyledButtonWrapper>
        )}
      </StyledContentContainer>
    </StyledModal>
  );
}

export default GroupInfoModal;
