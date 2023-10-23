interface FilesInfo {
  oid: string;
  name: string;
}

const FolderInFile = async ({oid, name}: FilesInfo) => {
  return (
    <div>{oid}{name}</div>
  );
}

export default FolderInFile;