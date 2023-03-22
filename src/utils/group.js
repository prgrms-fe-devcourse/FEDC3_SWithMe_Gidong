export const isMember = (group, id) => {
  const member = group.description.member.find((memberId) => memberId === id);
  return member && member.length;
};
