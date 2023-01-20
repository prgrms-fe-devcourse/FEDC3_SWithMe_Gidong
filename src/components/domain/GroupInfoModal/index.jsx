import { Button, Icon, Modal, SearchBar, Tag, Text } from '@/components/base';
import { Introduction, Member, MemberList } from '@/components/domain/groupInfo';
import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';
import { useUserContext } from '@/context/UserProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

function GroupInfoModal({ group, visible, onClose, ...props }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const { onUpdateGroup } = useGroupContext();
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

    if (description) {
      setMember(getMemberInfo());
      setMaster(getMasterInfo());
    }
  }, [description]);

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

    await onUpdateGroup(data);
    onClose && onClose();
  };

  return (
    <StyledModal visible={visible} onClose={handleModalClose} style={{ ...props.style }} {...props}>
      <StyledHeaderContainer>
        <span />
        <Text size={3.4} weight={700}>
          {name}
        </Text>
        <Icon size={4} style={{ cursor: 'pointer' }} onClick={handleModalClose} />
      </StyledHeaderContainer>
      <StyledContentContainer>
        <Tag tagList={tagList} fontsize={1.4} style={{ marginBottom: '1rem' }} />
        {intro ? (
          <Introduction intro={intro} />
        ) : (
          <Text size={2} weight={300}>
            그룹에 등록된 소개가 없습니다!
          </Text>
        )}
        <StyledMemberListContainerLabel>
          <SearchBar
            placeholder='찾고 싶은 그룹원의 이름을 검색하세요.'
            value={value}
            onChange={onChange}
            wrapperProps={{ style: { width: '30rem', marginLeft: '1rem' } }}
            iconProps={{ size: 2, style: { color: `${COLOR.DARK}` } }}
            style={{ fontSize: '1.8rem' }}
          />
          <Text color={COLOR.GRAY2} size={1.6}>
            <Icon type='regular' name='face-smile' size={1} /> : 오늘 TIL 작성자
          </Text>
        </StyledMemberListContainerLabel>
        {master && member && (
          <MemberList>
            <Member image={master.image} fullName={master.fullName} isMaster={true}>
              {checkWriteTIL(master.posts) ? <Icon type='regular' name='face-smile' size={2} /> : null}
            </Member>
            {member
              .filter(({ fullName }) => fullName.includes(value))
              .map(({ image, fullName, _id, posts }) => {
                return (
                  <Member key={_id} image={image} fullName={fullName}>
                    {checkWriteTIL(posts) ? <Icon type='regular' name='face-smile' size={2} /> : null}
                  </Member>
                );
              })}
          </MemberList>
        )}
        {loggedUser._id !== masterId && (
          <StyledButtonWrapper>
            <Button
              as='button'
              bgcolor='transpaent'
              color={COLOR.GRAY2}
              style={{ padding: 0, textDecoration: 'underline' }}
              onClick={handleWithdrawButtonClick}>
              그룹 탈퇴하기
            </Button>
          </StyledButtonWrapper>
        )}
      </StyledContentContainer>
    </StyledModal>
  );
}

export default GroupInfoModal;

const StyledModal = styled(Modal)`
  width: 70rem;
  @media (max-width: 624px) {
    width: 100%;
  }
`;

const StyledHeaderContainer = styled.div`
  padding: 0.5rem 2rem 0 2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;

  & > :nth-of-type(2) {
    width: 80%;
    padding-top: 2rem;
  }

  & > span {
    text-align: center;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 5%;
`;

const StyledMemberListContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 3rem 0 1rem 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
`;
