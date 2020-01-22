function Builder() {

}

Builder.prototype.finishBuild = function() {

    throw new Error("Builder finishBuild, this method of base class stands as a abstract method not to be called but to be replaced/overidden.");

};

exports.Builder = Builder
