import { memo } from 'react'
import { useSkillsState } from '../formState'
import ListInput from '../../../components/ListInput'
import { Typography } from '@mui/material'
import { hardSkills, softSkills } from '../../configuration'

const SkillsInformation = () => {
  const { soft, hard, setSoftSkill, setHardSkill } = useSkillsState()

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, width: '100%' }}>
        Soft Skills
      </Typography>
      <ListInput
        sx={{ width: '100%' }}
        value={soft}
        onChange={setSoftSkill}
        buttonLabel="Add Soft Skill"
        autocompletion={softSkills}
      />
      <Typography variant="h6" sx={{ mt: 2, width: '100%' }}>
        Hard Skills
      </Typography>
      <ListInput
        sx={{ width: '100%' }}
        value={hard}
        onChange={setHardSkill}
        buttonLabel="Add Hard Skill"
        autocompletion={hardSkills}
      />
    </>
  )
}

export default memo(SkillsInformation)
