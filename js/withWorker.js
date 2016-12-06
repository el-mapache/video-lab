var withWorker = function(object, pathToWorkerFile) {
  object.worker = new Worker(pathToWorkerFile);

  return object;
};
