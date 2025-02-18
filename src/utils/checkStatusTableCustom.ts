export const checkStatusTableCustom = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS': {
      return 0;
    }
    case 'COMPLETED': {
      return 1;
    }
    default: {
      return -1;
    }
  }
};
