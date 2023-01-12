import { Button, Icon, Modal, SearchBar, Tag, Text } from '@/components/base';
import { Introduction, Member, MemberList } from '@/components/domain/groupInfo';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function GroupInfoModal({ group, visible, onClose, ...props }) {
  const { name, description } = group;
  const { master, tagList, intro, member } = description;
  const { value, onChange } = useInput('');

  const checkWriteTIL = (posts) => {
    return posts.filter(
      ({ channel, createdAt }) =>
        channel === name && new Date(createdAt).toLocaleDateString('ko-kr') === new Date().toLocaleDateString('ko-kr'),
    ).length;
  };

  const handleModalClose = () => {
    onClose && onClose();
  };

  const handleDeleteGroup = () => {
    if (confirm('정말 삭제하시겠습니까? 한번 삭제하면 되돌릴 수 없습니다.')) {
      // TODO: DELETE GROUP API CALL
      onClose && onClose();
    }
  };

  return (
    <Modal visible={visible} onClose={handleModalClose} width='70rem' style={{ ...props.style }} {...props}>
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
        <StyledButtonWrapper>
          <Button
            as='button'
            bgcolor='transpaent'
            color={COLOR.GRAY2}
            style={{ padding: 0, textDecoration: 'underline' }}
            onClick={handleDeleteGroup}>
            그룹 삭제하기
          </Button>
        </StyledButtonWrapper>
      </StyledContentContainer>
    </Modal>
  );
}

export default GroupInfoModal;

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
