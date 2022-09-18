import * as React from 'react'

const Icon: React.FC<{ fill?: string; color?: string }> = (props) => {
  return (
    <svg width={50} height={51} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m42.627 29.637-5.636-7.302a.763.763 0 0 0-1.085-.134c-.168.134-.346.28-.514.414a.593.593 0 0 1-.403.157.953.953 0 0 1-.246-.045c-.369-.1-.738-.201-1.118-.235-1.23-.134-2.471-.246-3.701-.358l-.459-.045c-.425-.044-.85-.089-1.274-.089-.112 0-.235 0-.347.011-.884.056-1.812.18-2.807.38a37.401 37.401 0 0 0-3.03.76c-.324.09-1.666 1.857-2.55 3.031-.492.649-.916 1.208-1.129 1.443-.693.771-.649 1.755.123 2.571.268.28.682.436 1.14.436.448 0 .873-.156 1.164-.424 1.252-1.174 2.225-2.382 2.996-3.68.067-.122.224-.268.38-.301.75-.157 1.499-.302 2.349-.436.123 0 .268.044.391.111.783.459 1.554.929 2.337 1.398l6.128 3.68 1.465.894c.693.425 1.386.85 2.08 1.263a.422.422 0 0 0 .178.045.28.28 0 0 0 .112-.022c.436-.224.817-.425 1.175-.671.369-.258.726-.548 1.073-.839l1.062-.86a.82.82 0 0 0 .145-1.153ZM27.665 42.295c-.212-.771-.715-1.218-1.487-1.308l-.414-.056c-.033 0-.056-.022-.067-.056-.011-.033-.011-.067.011-.09l.134-.167a1.83 1.83 0 0 0 .403-1.722 1.756 1.756 0 0 0-1.23-1.219 1.928 1.928 0 0 0-.492-.067c-.402 0-.783.145-1.13.436-.122.1-.458.392-.458.392-.022.01-.033.022-.056.022-.01 0-.022 0-.033-.011a.084.084 0 0 1-.056-.079c-.011-.134-.023-.257-.023-.38-.01-.268-.022-.514-.089-.749a1.714 1.714 0 0 0-1.655-1.23c-.414 0-.816.145-1.152.414-.358.29-.704.581-1.073.872l-.57.47a.085.085 0 0 1-.056.022c-.012 0-.023 0-.034-.011a.084.084 0 0 1-.056-.078l-.045-.437c-.09-.738-.48-1.23-1.14-1.487a1.89 1.89 0 0 0-.637-.123c-.414 0-.806.157-1.164.47-.145.123-.29.257-.424.391-.526.526-.682 1.152-.459 1.845.224.694.693 1.096 1.409 1.208.078.011.157.011.246.011 0 0 .38-.011.47-.011.022 0 .056.011.067.033.022.023.022.045.022.068-.123.905.157 1.554.839 1.968.29.178.57.257.872.257.414 0 .839-.168 1.308-.492.011-.011.034-.011.056-.011a.1.1 0 0 1 .056.01c.034.023.045.057.034.101l-.1.425c-.169.805.145 1.577.804 1.98.28.167.593.257.895.257.436 0 .86-.168 1.219-.492l.503-.436c.022-.011.033-.023.056-.023.01 0 .033 0 .044.011.034.012.056.056.045.09l-.022.347c-.056.782.313 1.476.984 1.8.246.123.514.19.783.19.458 0 .883-.179 1.24-.526l.113-.111c.357-.336.704-.671 1.05-1.018.47-.458.638-1.051.46-1.7Z" />
      <path d="m38.925 34.233-3.712-2.236-4.529-2.74c-1.353-.816-2.717-1.644-4.07-2.46a.547.547 0 0 0-.257-.056h-.023c-.559.09-1.118.201-1.677.313a.375.375 0 0 0-.235.18c-.794 1.274-1.767 2.46-2.963 3.6-.526.503-1.13.76-1.778.76-.347 0-.716-.078-1.085-.224-.816-.324-1.386-1.017-1.576-1.9a2.736 2.736 0 0 1 .693-2.472c.09-.1.503-.648.984-1.286 1.196-1.61 2.214-2.963 2.527-3.12l-1.398.012c-1.397.011-2.795.011-4.193.011l-.302-.011c-.09 0-.145-.023-.212-.045l-.839-.436a.83.83 0 0 0-1.107.302L8.298 30.32a.88.88 0 0 0 .134 1.084l1.71 1.622c.034.033.068.055.124.145.123.212.257.425.402.637.716 1.018 1.767 1.644 2.785 2.248l.268.156c.034 0 .09-.022.1-.033.112-.1.224-.213.336-.325.123-.123.257-.257.38-.368a2.668 2.668 0 0 1 1.767-.683c.75 0 1.476.336 1.99.906.123.134.224.28.325.436l.067.134c.682-.603 1.364-1.151 2.303-1.151.101 0 .213.01.325.022 1.05.134 1.811.738 2.225 1.778.38-.134.738-.201 1.073-.201.649 0 1.242.246 1.767.738.805.76 1.04 1.722.704 2.84.906.447 1.42 1.152 1.555 2.113.123.917-.179 1.711-.917 2.416l.402.246c.302.179.638.28.973.28.403 0 .783-.135 1.096-.392.604-.515.805-1.308.515-2.08l-.101-.257a.36.36 0 0 1 .011-.157c.022-.033.056-.067.134-.067.023 0 .045 0 .079.011.257.135.492.28.782.47.313.201.671.313 1.018.313.458 0 .894-.19 1.219-.514.604-.615.693-1.499.223-2.27l-.156-.269c-.022-.033-.022-.134 0-.167.022-.045.067-.079.156-.079h.056c.213.09.403.202.627.325.29.168.603.246.916.246.436 0 .873-.18 1.197-.492.57-.548.704-1.387.346-2.136l-.089-.19c-.011-.034-.011-.134.011-.157.023-.044.067-.067.157-.067h.056c.1.034.19.056.28.079a1.76 1.76 0 0 0 2.069-1.04c.267-.84-.035-1.79-.773-2.237Z" />
    </svg>
  )
}

export default Icon
